const { pool } = require('./index');

const getUser = async (id) => {
    const query = "SELECT * FROM users WHERE id = $1";
    const values = [id];

    try {
        const { rows } = await pool.query(query, values);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch (err) {
        console.log("Get user failed", err);
        return err;
    }
}

const insertUser = async (name) => {
    const query = "INSERT INTO users (name) VALUES ($1) RETURNING id";
    const values = [name];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (err) {
        console.log("Insert user failed", err);
        return err;
    }
}

const deleteUser = async (id) => {
    const query = "DELETE FROM users WHERE id = $1";
    const values = [id];

    try {
        const { rowCount } = await pool.query(query, values);
        if (rowCount !== 0) {
            return true;
        }
        return false;
    } catch (err) {
        console.log("Delete user failed", err.message);
        return err;
    }
}

module.exports = {
    getUser,
    insertUser,
    deleteUser,
}