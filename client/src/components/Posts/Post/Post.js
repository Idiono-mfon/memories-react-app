import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumpUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumpUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
// Actions
import { deletePost, likePost } from "../../../actions/post";

import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumpUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumpUpAltOutlined fontSize="small" /> &nbsp; {post.likes.length}
          {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    // No likes Yet
    return (
      <>
        <ThumpUpAltOutlined /> &nbsp; Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />

      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId === post.creator ||
        user?.result?._id === post.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              setCurrentId(post._id);
            }}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
      <div className="details">
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography variant="h5" gutterBottom className={classes.title}>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" component="p" color="textSecondary">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => dispatch(likePost(post._id))}
          size="small"
          color="primary"
          disbled={!user?.result}
        >
          <Likes />
        </Button>

        {(user?.result?.googleId === post.creator ||
          user?.result?._id === post.creator) && (
          <Button
            onClick={() => dispatch(deletePost(post._id))}
            size="small"
            color="primary"
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
