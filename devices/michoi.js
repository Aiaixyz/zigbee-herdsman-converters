const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    zigbeeModel: ['VZ00E321V000201'], // The model ID from: Device with modelID 'lumi.sens' is not supported.
    model: 'MC-621LZB', // Vendor model number, look on the device for a model number
    vendor: 'MiCHOI', // Vendor of the device (only used for documentation and startup logging)
    description: 'MiCHOI MC-621LZB Touch Smart Wall Switch', // Description of the device, copy from vendor site. (only used for documentation and startup logging)
    extend: extend.switch(),
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff']);
            await reporting.onOff(endpoint);
        },
};

module.exports = definition;
