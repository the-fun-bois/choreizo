using environment variables:
create a .env in the root of this folder and add variables in there:
YOUR_ENV_VARIABLE= some_value

to access in a file use:
const {YOUR_ENV_VARIABLE} = require('react-native-dotenv')
