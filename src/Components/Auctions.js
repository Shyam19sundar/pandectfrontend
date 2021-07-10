import React from 'react'
import "../Css/Auctions.css"
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Avatar } from '@material-ui/core';
import { green, pink } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../StateProvider'


function Auctions() {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        pink: {
            color: "fff",
            backgroundColor: theme.palette.common.black,
        },
        green: {
            color: '#fff',
            backgroundColor: green[500],
        }
    }));

    const classes = useStyles();

    return (
        <div>
            <div className="auction__body">
                <div className="auction__content">
                    <h1>Website Is</h1>
                    <h1> Under Construction</h1>
                    <p>This option is still under process and will start very soon
                        <br />
                    Soon Community members will be able to sell their art through Pandect</p>
                    <div className="auction__icons">
                        <Avatar className={classes.pink}>
                            <FacebookIcon style={{ color: "white" }} />
                        </Avatar>
                        <Avatar className={classes.pink}>
                            <InstagramIcon />
                        </Avatar>
                        <Avatar className={classes.pink}>
                            <TwitterIcon />
                        </Avatar>
                    </div>
                </div>
                <div className="auction__img">
                    <img src="construction.jpg" alt="Loading" />
                </div>
            </div>

        </div>
    )
}

export default Auctions
