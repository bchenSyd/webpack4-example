const address = {
    state: 'nsw',
    suburb: 'pennant hills',
    postcode: '2120'
};
const { suburb, ...rest } = address;

const getSuburb = () => 'bochen:get-suburb ' + suburb;
export default getSuburb;