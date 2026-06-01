CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE usuarios (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  username text NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  activo boolean DEFAULT true,
  created_at timestamp DEFAULT now()
);

CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre text UNIQUE NOT NULL,
  descripcion text
);

CREATE TABLE usuario_rol (
  usuario_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  rol_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  created_at timestamp DEFAULT now(),
  PRIMARY KEY (usuario_id, rol_id)
);

CREATE TABLE grados (
  id int PRIMARY KEY,
  nombre text NOT NULL,
  orden int
);

CREATE TABLE instituciones (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre text NOT NULL,
  sigla text,
  tipo text,
  activo boolean DEFAULT true,
  created_at timestamp DEFAULT now()
);

CREATE TABLE especialidades (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre text NOT NULL,
  tipo text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE personal (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  escalafon text UNIQUE,
  primer_nombre text NOT NULL,
  segundo_nombre text,
  ap_paterno text,
  ap_materno text,
  ap_esposo text,
  grado_id int REFERENCES grados(id),
  ci text UNIQUE NOT NULL,
  exp text,
  genero text,
  altura_cm numeric,
  peso_kg numeric,
  foto_url text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  deleted_at timestamp
);

CREATE TABLE info_personal (
  personal_id uuid PRIMARY KEY REFERENCES personal(id) ON DELETE CASCADE,
  estado_civil text,
  f_nac date,
  grupo_sanguineo text,
  f_ingreso date,
  tel_cel text,
  tel_part text,
  direccion text,
  zona text,
  sigep text,
  email text
);

CREATE TABLE contactos_emergencia (
  id bigserial PRIMARY KEY,
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  nombres text,
  apellidos text,
  telefono text,
  celular text,
  direccion text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE dependientes (
  id bigserial PRIMARY KEY,
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  tipo text,
  nombres text,
  apellidos text,
  celular text,
  direccion text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE personal_especialidad (
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  especialidad_id uuid REFERENCES especialidades(id) ON DELETE CASCADE,
  created_at timestamp DEFAULT now(),
  PRIMARY KEY (personal_id, especialidad_id)
);

CREATE TABLE asignaciones (
  id bigserial PRIMARY KEY,
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  institucion_id uuid REFERENCES instituciones(id),
  cargo text,
  unidad text,
  desde date,
  hasta date,
  activo boolean DEFAULT true,
  created_at timestamp DEFAULT now()
);

CREATE TABLE destinos (
  id bigserial PRIMARY KEY,
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  unidad_anterior text,
  unidad_actual text,
  cargo_actual text,
  memo_nro text,
  fecha_destino date,
  estado_personal text,
  observaciones text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE situaciones (
  id bigserial PRIMARY KEY,
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  tipo text,
  causal text,
  fecha_inicio date,
  fecha_retorno date,
  situacion_actual text,
  observaciones text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE bajas (
  id bigserial PRIMARY KEY,
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  fecha_baja date,
  motivo text,
  observaciones text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE reclamaciones (
  id bigserial PRIMARY KEY,
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  tipo text,
  fecha date,
  unidad_representada text,
  nro_memorandum text,
  observaciones text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE vacaciones (
  id bigserial PRIMARY KEY,
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  nro text,
  nro_memo text,
  desde date,
  hasta date,
  dias int,
  observaciones text,
  autoridad_firma text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE bajas_medicas (
  id bigserial PRIMARY KEY,
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  nro text,
  nro_folio text,
  desde date,
  hasta date,
  institucion_medica text,
  observaciones text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE comisiones (
  id bigserial PRIMARY KEY,
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  nro text,
  nro_folio text,
  nro_memo text,
  desde date,
  hasta date,
  unidad_org text,
  autoridad_firma text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE disciplinario (
  id bigserial PRIMARY KEY,
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  nro text,
  nro_folio text,
  nro_memo text,
  fecha date,
  causal text,
  observaciones text,
  autoridad_firma text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE felicitaciones (
  id bigserial PRIMARY KEY,
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  nro text,
  nro_folio text,
  nro_memo text,
  fecha_entrega date,
  motivo text,
  autoridad_firma text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE llamadas_atencion (
  id bigserial PRIMARY KEY,
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  nro text,
  nro_folio text,
  nro_memo text,
  fecha_entrega date,
  motivo text,
  autoridad_firma text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE designaciones (
  id bigserial PRIMARY KEY,
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  nro text,
  nro_folio text,
  nro_memo text,
  fecha_entrega date,
  designacion text,
  autoridad_firma text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE pasaportes (
  id bigserial PRIMARY KEY,
  personal_id uuid REFERENCES personal(id) ON DELETE CASCADE,
  nro_folio text,
  nro_pasaporte text,
  dias int,
  fecha_salida date,
  fecha_llegada date,
  destino text,
  motivo text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE correspondencia (
  id bigserial PRIMARY KEY,
  tipo text,
  codigo_registro text,
  origen text,
  nro_oficio text,
  referencia text,
  remitente text,
  seccion text,
  fecha_hora timestamp,
  firma text,
  tiempo_respuesta text,
  personal_id uuid REFERENCES personal(id) ON DELETE SET NULL,
  created_at timestamp DEFAULT now()
);

CREATE TABLE revision_juridica (
  id bigserial PRIMARY KEY,
  tipo text,
  codigo text,
  destino text,
  origen text,
  fecha date,
  motivo text,
  recepcion text,
  fecha_hora timestamp,
  firma text,
  entrega text,
  personal_id uuid REFERENCES personal(id) ON DELETE SET NULL,
  created_at timestamp DEFAULT now()
);

CREATE TABLE archivos (
  id bigserial PRIMARY KEY,
  tipo text,
  codigo text,
  fecha date,
  nombre text,
  inicio date,
  fin date,
  created_at timestamp DEFAULT now()
);

CREATE TABLE adjuntos (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename text,
  mime text,
  size int,
  url text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE archivos_rel (
  id bigserial PRIMARY KEY,
  entity_type text,
  entity_id text,
  archivo_id bigint REFERENCES archivos(id) ON DELETE CASCADE,
  created_at timestamp DEFAULT now()
);

CREATE TABLE audit_logs (
  id bigserial PRIMARY KEY,
  actor_id uuid REFERENCES usuarios(id) ON DELETE SET NULL,
  entidad text,
  entidad_id text,
  accion text,
  payload text,
  created_at timestamp DEFAULT now()
);

CREATE OR REPLACE FUNCTION actualizar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_personal_updated_at
BEFORE UPDATE ON personal
FOR EACH ROW
EXECUTE FUNCTION actualizar_updated_at();

CREATE INDEX idx_personal_nombre ON personal(ap_paterno, ap_materno, primer_nombre);
CREATE INDEX idx_personal_ci ON personal(ci);
CREATE INDEX idx_asignaciones_personal ON asignaciones(personal_id);
CREATE INDEX idx_destinos_personal ON destinos(personal_id);
CREATE INDEX idx_vacaciones_personal ON vacaciones(personal_id);
CREATE INDEX idx_correspondencia_codigo ON correspondencia(codigo_registro);