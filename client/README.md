using environment variables:
create a .env in the root of this folder and add variables in there:
YOUR_ENV_VARIABLE= some_value

to access in a file use:
const {YOUR_ENV_VARIABLE} = require('react-native-dotenv')

using vector icons

find your icon here:
https://expo.github.io/vector-icons/

icon name is on the right
icon maker is on the left

require the vector package in your file
const {IconMaker} = require(@expo/vector-icons)

create a vector component
<IconMaker name="name-of-icon" size={32} color="green" />

to run react native debugger for expo:
open "rndebugger://set-debugger-loc?host=localhost&port=19001"

then enable remote js debugging in the app
