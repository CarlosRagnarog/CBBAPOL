const pool = require("../config/db");

const getAll = async ({ search = "", limit = 10, offset = 0 }) => {
  const query = `
    SELECT 
      p.id,
      p.escalafon,
      p.primer_nombre,
      p.segundo_nombre,
      p.ap_paterno,
      p.ap_materno,
      p.ap_esposo,
      p.ci,
      p.exp,
      p.genero,
      p.foto_url,
      g.nombre AS grado,
      p.created_at,
      p.updated_at
    FROM personal p
    LEFT JOIN grados g ON g.id = p.grado_id
    WHERE p.deleted_at IS NULL
      AND (
        p.primer_nombre ILIKE $1 OR
        p.ap_paterno ILIKE $1 OR
        p.ap_materno ILIKE $1 OR
        p.ci ILIKE $1 OR
        p.escalafon ILIKE $1
      )
    ORDER BY p.created_at DESC
    LIMIT $2 OFFSET $3
  `;

  const values = [`%${search}%`, limit, offset];
  const result = await pool.query(query, values);
  return result.rows;
};

const getById = async (id) => {
  const query = `
    SELECT 
      p.*,
      ip.estado_civil,
      ip.f_nac,
      ip.grupo_sanguineo,
      ip.f_ingreso,
      ip.tel_cel,
      ip.tel_part,
      ip.direccion,
      ip.zona,
      ip.sigep,
      ip.email,
      g.nombre AS grado
    FROM personal p
    LEFT JOIN info_personal ip ON ip.personal_id = p.id
    LEFT JOIN grados g ON g.id = p.grado_id
    WHERE p.id = $1 AND p.deleted_at IS NULL
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const create = async (data) => {
  const query = `
    INSERT INTO personal (
      escalafon,
      primer_nombre,
      segundo_nombre,
      ap_paterno,
      ap_materno,
      ap_esposo,
      grado_id,
      ci,
      exp,
      genero,
      altura_cm,
      peso_kg,
      foto_url
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    RETURNING *
  `;

  const values = [
    data.escalafon,
    data.primer_nombre,
    data.segundo_nombre,
    data.ap_paterno,
    data.ap_materno,
    data.ap_esposo,
    data.grado_id,
    data.ci,
    data.exp,
    data.genero,
    data.altura_cm,
    data.peso_kg,
    data.foto_url,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const update = async (id, data) => {
  const query = `
    UPDATE personal SET
      escalafon = $1,
      primer_nombre = $2,
      segundo_nombre = $3,
      ap_paterno = $4,
      ap_materno = $5,
      ap_esposo = $6,
      grado_id = $7,
      ci = $8,
      exp = $9,
      genero = $10,
      altura_cm = $11,
      peso_kg = $12,
      foto_url = $13
    WHERE id = $14 AND deleted_at IS NULL
    RETURNING *
  `;

  const values = [
    data.escalafon,
    data.primer_nombre,
    data.segundo_nombre,
    data.ap_paterno,
    data.ap_materno,
    data.ap_esposo,
    data.grado_id,
    data.ci,
    data.exp,
    data.genero,
    data.altura_cm,
    data.peso_kg,
    data.foto_url,
    id,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const remove = async (id) => {
  const query = `
    UPDATE personal
    SET deleted_at = now()
    WHERE id = $1 AND deleted_at IS NULL
    RETURNING *
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};
const findByCi = async (ci) => {
  const result = await pool.query(
    "SELECT id, ci FROM personal WHERE ci = $1 AND deleted_at IS NULL",
    [ci],
  );

  return result.rows[0];
};

const findByEscalafon = async (escalafon) => {
  const result = await pool.query(
    "SELECT id, escalafon FROM personal WHERE escalafon = $1 AND deleted_at IS NULL",
    [escalafon],
  );

  return result.rows[0];
};
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  findByCi,
  findByEscalafon,
};
