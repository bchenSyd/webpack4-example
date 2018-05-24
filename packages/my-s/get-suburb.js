const address = {
    state: 'nsw',
    suburb: 'pennant hills',
    postcode: '2120'
};
const { suburb, ...rest } = address;

const getSuburb = () => 'get:suburb ' + suburb;
export default getSuburb;