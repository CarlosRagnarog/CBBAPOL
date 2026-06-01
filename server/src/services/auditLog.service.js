const auditLogRepository = require('../repositories/auditLog.repository');

const getAllAuditLogs = async () => {
  return await auditLogRepository.getAll();
};

const createAuditLog = async (data) => {
  return await auditLogRepository.create(data);
};

module.exports = {
  getAllAuditLogs,
  createAuditLog
};