import { Avatar } from '@material-ui/core'
import React from 'react'
import "../Css/About.css"
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';


function About() {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },

        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(9),
            height: theme.spacing(9),
        },
        darkBlue: {
            color: "#fff",
            backgroundColor: theme.palette.primary.dark,
        },
        pink: {
            color: "#fff",
            backgroundColor: theme.palette.secondary.light
        },
        blue: {
            color: "#fff",
            backgroundColor: theme.palette.info.light
        }
        // green: {
        //     color: '#fff',
        //     backgroundColor: green[500],
        // }
    }));
    const classes = useStyles();

    return (
        <div>
            <div className="about__body">
                <div className="about__left">
                    <img src="about.jpg" />
                </div>
                <div className="about__right">
                    <h3>What is "The Pandect"?</h3>
                    <p>
                        The Pandect is a platform that focuses on every ambient of art and tries to bring
                        it under one roof. We beleive that art in any form should be duly recognized and
                        appreciated in whatsover manner as possible. We bring talents inti limelight and
                        set up a stage for them. Such an initiative enables creative minds to reach
                        their Destination
                    </p>
                    <br />
                    <br />
                    <h3>Why "The Pandect"?</h3>
                    <p>
                        Among the number of journals out there in the world, you can identify
                        The Pandect from a considerable distance without any trouble because
                        it won't look like any of them and not one among hem. We deliver a unique service
                        to our valuable consumers, which they cannot find anywhere else in the world.
                        The Pandect is the right choice for people who beleive that art has no
                        defined structure but is an evolving living creature.
                    </p>
                    <br />
                    <br />
                </div>
            </div>
            <h2 className="our">Our Members</h2>
            <div className="about__icons">
                <div className="about__avatar">
                    <Avatar src="ayya.jpg" className={classes.large} />
                    <h6>Kalam Sir</h6>
                    <span>Scientist</span>
                </div>
                <div className="about__avatar">
                    <Avatar src="musk.jpg" className={classes.large} />
                    <h6>Elom Musk</h6>
                    <span>Scientist</span>
                </div>
                <div className="about__avatar">
                    <Avatar src="google.jpg" className={classes.large} />
                    <h6>Sundar Pitchai</h6>
                    <span>CEO</span>
                </div>
                <div className="about__avatar">
                    <Avatar src="download.jpg" className={classes.large} />
                    <h6>Mark</h6>
                    <span>CEO</span>
                </div>
            </div>
            <div className="about__icons">
                <Avatar className={classes.darkBlue}>
                    <FacebookIcon />
                </Avatar>
                <Avatar className={classes.pink}>
                    <InstagramIcon />
                </Avatar>
                <Avatar className={classes.blue}>
                    <TwitterIcon />
                </Avatar>
            </div>
        </div>
    )
}

export default About
