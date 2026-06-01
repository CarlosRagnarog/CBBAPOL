const auditLogService = require('../services/auditLog.service');

const getAll = async (req, res) => {
  try {
    const data = await auditLogService.getAllAuditLogs();
    res.json({ ok: true, data });
  } catch (error) {
    res.status(error.status || 500).json({
      ok: false,
      message: error.message
    });
  }
};

module.exports = {
  getAll
};