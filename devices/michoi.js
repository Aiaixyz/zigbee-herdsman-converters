const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    zigbeeModel: ['VZ00E321V000201'], // The model ID from: Device with modelID 'lumi.sens' is not supported.
    model: 'MC-621LZB', // Vendor model number, look on the device for a model number
    vendor: 'MiCHOI', // Vendor of the device (only used for documentation and startup logging)
    description: 'MiCHOI 单控触摸开关', // Description of the device, copy from vendor site. (only used for documentation and startup logging)
    extend: extend.switch(),
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff']);
            await reporting.onOff(endpoint);
        },
};

const definition = {
    zigbeeModel: ['VZ00E321V000202'], // The model ID from: Device with modelID 'lumi.sens' is not supported.
    model: 'MC-622LZB', // Vendor model number, look on the device for a model number
    vendor: 'MiCHOI', // Vendor of the device (only used for documentation and startup logging)
    description: 'MiCHOI 双控触摸开关', // Description of the device, copy from vendor site. (only used for documentation and startup logging)
        extend: extend.switch(),
        exposes: [e.switch().withEndpoint('left'), e.switch().withEndpoint('right')],
        meta: {multiEndpoint: true},
        endpoint: (device) => {
            return {'left': 1, 'right': 2};
        },
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint1 = device.getEndpoint(1);
            await reporting.bind(endpoint1, coordinatorEndpoint, ['genOnOff']);
            await reporting.onOff(endpoint1);
            const endpoint2 = device.getEndpoint(2);
            await reporting.bind(endpoint2, coordinatorEndpoint, ['genOnOff']);
            await reporting.onOff(endpoint2);
        },
};
module.exports = definition;
