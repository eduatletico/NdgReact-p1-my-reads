import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
	paper: {
		position:'fixed',
    height: '100%',
    width: '100%',
    margin: 0,
    backgroundColor: 'rgba(46, 49, 49, 0.7)',
    zIndex:20000
  },
  progress: {
	  margin:'auto',
	  left:0,
	  right:0,
	  top:0,
	  bottom:0,
	  position:'fixed'
  },
})

const Loader = (props) => {
	return (
		<div className={props.classes.paper}>
			<CircularProgress className={props.classes.progress} size={80} />
		</div>
	)
}

export default withStyles(styles)(Loader)