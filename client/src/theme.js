import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/indigo';
import teal from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

export default createMuiTheme({
  palette: {
		primary: {
			main: '#607d8b'
		},
		secondary: {
			main: '#009688'
		}
	},
	typography: {
		fontFamily: '"Oswald", sans-serif',
		useNextVariants: true
	}
});
