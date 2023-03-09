const express = require("express");
const mysql = require("mysql2");
const handlebars = require("express-handlebars");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123aze",
  database: "mydb",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

const hbs = handlebars.create();
hbs.handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});
hbs.handlebars.registerHelper("inline", function () {
  var args = [].slice.call(arguments);
  var options = args.pop();
  var template = hbs.handlebars.compile(options.fn(this));
  return template(this, { data: options.data });
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine("handlebars", hbs.engine);
app.use(express.static(__dirname));
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home", { layout: "index" });
});
app.get("/test", async (req, res) => {
  try {
    const [
      gamescountarray,
      uptime,
      userscountarray,
      adminscountarray,
      commentscountarray,
    ] = await Promise.all([
      new Promise((resolve, reject) => {
        connection.query(
          "SELECT COUNT(*) as gamecount FROM game ",
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      }),

      new Promise((resolve, reject) => {
        connection.query(
          "SELECT CONCAT( FLOOR(VARIABLE_VALUE / 86400), 'd ', FLOOR(MOD(VARIABLE_VALUE, 86400) / 3600), 'h ', FLOOR(MOD(VARIABLE_VALUE, 3600) / 60), 'm')  as Uptime FROM performance_schema.global_status WHERE VARIABLE_NAME='Uptime';",
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results[0].Uptime);
            }
          }
        );
      }),
      new Promise((resolve, reject) => {
        connection.query(
          "SELECT COUNT(*) as usercount FROM user WHERE role='user'",
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      }),
      new Promise((resolve, reject) => {
        connection.query(
          "SELECT COUNT(*) as admincount FROM user WHERE role='admin'",
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      }),
      new Promise((resolve, reject) => {
        connection.query(
          "SELECT COUNT(*) as commentcount FROM comment ",
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      }),
    ]);

    const usercount = userscountarray[0].usercount;
    const admincount = adminscountarray[0].admincount;
    const gamecount = gamescountarray[0].gamecount;
    const commentcount = commentscountarray[0].commentcount;
    res.render("test", {
      layout: "index",
      uptime,
      usercount,
      admincount,
      gamecount,
      commentcount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving server uptime");
  }
});

app.get("/AdminPanel", (req, res) => {
  res.render("AdminPanel", { layout: "index" });
});
/********** */
async function executeQuery(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.get("/AddGame", async (req, res) => {
  try {
    const [
      genres,
      developers,
      playerprespectives,
      publishers,
      engines,
      languages,
      platforms,
      categorys,
    ] = await Promise.all([
      executeQuery("SELECT * FROM genre"),
      executeQuery("SELECT * FROM developer"),
      executeQuery("SELECT * FROM player_prespective"),
      executeQuery("SELECT * FROM publisher"),
      executeQuery("SELECT * FROM engine"),
      executeQuery("SELECT * FROM language"),
      executeQuery("SELECT * FROM platform"),
      executeQuery("SELECT * FROM category"),
    ]);
    res.render("AddGame", {
      layout: "index",
      genres,
      developers,
      playerprespectives,
      publishers,
      engines,
      languages,
      platforms,
      categorys,
    });
  } catch (err) {
    console.log("Error fetching data:", err);
    res.sendStatus(500);
  }
});
/************************************************************************** */

app.post("/AddGame", async (req, res) => {
  try {
    const gameName = req.body.name;
    const description = req.body.description;
    const img = req.body.img;
    const date = req.body.date;
    const rating = req.body.rating;

    const playerPerspectives = req.body.prespective || [];
    const newPerspectives = req.body.prespective_input || [];

    const developers = req.body.developer || [];
    const newDevelopers = req.body.developer_input || [];

    const languages = req.body.language || [];
    const newLanguages = req.body.language_input || [];

    const genres = req.body.genre || [];
    const newGenres = req.body.genre_input || [];

    const platforms = req.body.platform || [];
    const newPlatforms = req.body.platform_input || [];

    const publisher = req.body.publisher;
    const newPublisherName = req.body.new_publisher;
    const engine = req.body.engine;
    const newEngineName = req.body.new_engine;

    const conn = await connection.promise();
    await conn.beginTransaction();

    try {
      const [result] = await conn.execute(
        "INSERT INTO game (Name, Description, Pimg, ReleaseDate, Official_rating) VALUES (?, ?, ?, ?, ?)",
        [gameName, description, img, date, rating]
      );

      const gameId = result.insertId;

      async function insertDataIntoTable(
        conn,
        tableName,
        idFieldName,
        data,
        newData
      ) {
        const selectedData = [...data];

        for (let i = 0; i < newData.length; i++) {
          const dataValue = newData[i];
          const [result] = await conn.execute(
            `SELECT id FROM ${tableName} WHERE ${idFieldName} = ?`,
            [dataValue]
          );
          if (!(result.length > 0)) {
            // Check if the new data already exists
            const [existingResult] = await conn.execute(
              `SELECT id FROM ${tableName} WHERE ${idFieldName} = ?`,
              [dataValue]
            );
            if (existingResult.length > 0) {
              // If the new data already exists, use the existing ID
              selectedData.push(existingResult[0].id);
            } else {
              // Otherwise, insert the new data into the table and use the new ID
              const [insertResult] = await conn.execute(
                `INSERT INTO ${tableName} (${idFieldName}) VALUES (?)`,
                [dataValue]
              );
              selectedData.push(insertResult.insertId);
            }
          }
        }

        for (let i = 0; i < selectedData.length; i++) {
          const dataId = selectedData[i];
          await conn.execute(
            `INSERT INTO game_${tableName} (game_id, ${idFieldName}_id) VALUES (?, ?)`,
            [gameId, dataId]
          );
        }
      }

      await insertDataIntoTable(
        conn,
        "player_prespective",
        "prespective",
        playerPerspectives,
        newPerspectives
      );
      await insertDataIntoTable(
        conn,
        "developer",
        "developer",
        developers,
        newDevelopers
      );
      await insertDataIntoTable(
        conn,
        "language",
        "language",
        languages,
        newLanguages
      );
      await insertDataIntoTable(conn, "genre", "genre", genres, newGenres);
      await insertDataIntoTable(
        conn,
        "platform",
        "platform",
        platforms,
        newPlatforms
      );
      async function insertSelect(
        conn,
        gameId,
        tableType,
        publisherOrEngine,
        newPublisherOrEngine
      ) {
        const table = tableType === "publisher" ? "publisher" : "engine";
        const idField =
          tableType === "publisher" ? "publisher_id" : "engine_id";
        const newField = tableType === "publisher" ? "publisher" : "engine";

        const [result] = await conn.execute(
          `SELECT id FROM ${table} WHERE ${newField} = ?`,
          [publisherOrEngine]
        );

        let id;

        if (result.length > 0) {
          id = result[0].id;
          await conn.execute(
            `INSERT INTO game_${tableType} (game_id, ${idField})
            VALUES (?, ?)`,
            [gameId, id]
          );
        } else if (publisherOrEngine === `__add_${tableType}__`) {
          const [newResult] = await conn.execute(
            `SELECT id FROM ${table} WHERE ${newField} = ?`,
            [newPublisherOrEngine]
          );
          if (newResult.length > 0) {
            id = newResult[0].id;
          } else {
            const [insertResult] = await conn.execute(
              `INSERT INTO ${table} (${newField}) VALUES (?)`,
              [newPublisherOrEngine]
            );
            id = insertResult.insertId;
          }
          await conn.execute(
            `INSERT INTO game_${tableType} (game_id, ${idField})
            VALUES (?, ?)`,
            [gameId, id]
          );
        } else {
          id = publisherOrEngine;
          await conn.execute(
            `INSERT INTO game_${tableType} (game_id, ${idField})
            VALUES (?, ?)`,
            [gameId, id]
          );
        }
      }

      await insertSelect(
        conn,
        gameId,
        "publisher",
        publisher,
        newPublisherName
      );

      await insertSelect(conn, gameId, "engine", engine, newEngineName);

      await conn.commit();

      res.redirect("/AddGame");
    } catch (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.get("/UsersPanel", (req, res) => {
  connection.query("SELECT * FROM user", (err, results) => {
    if (err) {
      console.log("Error fetching users:", err);
      res.sendStatus(500);
    } else {
      res.render("UsersPanel", {
        layout: "index",
        users: results,
        username: results.username,
      });
    }
  });
});
app.post("/UsersPanel/:id/role", (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  connection.query(
    "UPDATE user SET role = ? WHERE id = ?",
    [role, id],
    (err, result) => {
      if (err) {
        console.log("Error updating role:", err);
        res.sendStatus(500);
      } else {
        console.log(`Updated role for user with id ${id} to ${role}`);
        res.redirect("/UsersPanel");
      }
    }
  );
});

app.post("/UsersPanel/:id/delete", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM user WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log("Error deleting user:", err);
      res.sendStatus(500);
    } else {
      console.log(`Deleted user with id ${id}`);
      res.redirect("/UsersPanel");
    }
  });
});

app.listen(3000, () => console.log("App listening on port 3000"));
