import objectUrl from "object-url.macro";
import dimensions from "dimensions.macro";

const imageUrl = objectUrl("./image.jpg");
const imageSize = dimensions("./image.jpg");

const SomeComponent = () => (
    <img src={imageUrl} style={{
        width: imageSize.width + "px",
        height: imageSize.height + "px"
    }}></img>
);
