const address = {
    state: 'nsw',
    suburb: 'pennant hills',
    postcode: '2120'
};
const { suburb, ...rest } = address;

const getSuburb = () => suburb;
export default getSuburb;