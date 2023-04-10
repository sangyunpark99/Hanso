const os = require("os");
const interfaces = os.networkInterfaces();

const getAddress = () => {
  // aws - DHCP로 ip를 동적할당 하므로 변경된 ip 추출
  let ipAddress = "";
  Object.keys(interfaces).forEach((key) => {
    interfaces[key].forEach((interface) => {
      if (interface.family === "IPv4" && !interface.internal) {
        ipAddress = interface.address;
      }
    });
  });

  return ipAddress;
};

module.exports = getAddress;
