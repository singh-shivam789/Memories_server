import "./share.css";
import { Photo, Label, LocationOn, Mood } from '@material-ui/icons';
export default function Share() {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfilePic" src="/assets/person/1.jpeg" alt="" />
                    <input className="shareInput" placeholder="What's on your mind Shivam?" type="text" />
                </div>
                <hr />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <Photo className="shareOptionIcon" htmlColor="tomato"></Photo>
                            <span className="shareOptionText">Photo/Video</span>
                        </div>
                        <div className="shareOption">
                            <Label className="shareOptionIcon" htmlColor="blue"></Label>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <LocationOn className="shareOptionIcon" htmlColor="green"></LocationOn>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <Mood className="shareOptionIcon" htmlColor="goldenrod"></Mood>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </div>
    )
}
