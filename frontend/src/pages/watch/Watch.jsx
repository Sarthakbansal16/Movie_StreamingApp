import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import "./watch.scss";

export default function Watch() {
  return (
    <div className="watch">
      <div className="back">
        <ArrowBackIosNewOutlinedIcon/>
        Home
      </div>
      <video
        className="video"
        autoPlay
        controls
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        width="640"
        height="360"
      />
    </div>
  );
}