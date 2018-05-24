function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var address = {
    state: 'nsw',
    suburb: 'pennant hills',
    postcode: '2120'
};

var suburb = address.suburb,
    rest = _objectWithoutProperties(address, ['suburb']);

var getSuburb = function getSuburb() {
    return 'get:suburb ' + suburb;
};
export default getSuburb;