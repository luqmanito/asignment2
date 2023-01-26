const response = (res, result) => {
    const { status, error, data, message, meta, } = result;
    const resultPrint = {};
    resultPrint.data = data || null
    resultPrint.code = status;
    resultPrint.message = message || "success";
    if (meta) {
      resultPrint.meta = meta;
    }
    if (error) {
      resultPrint.error = error || null;
    }
    res.status(status).json(resultPrint);
  };
  module.exports = response;
  