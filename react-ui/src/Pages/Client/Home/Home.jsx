import React from "react";
export default function Home(props) {
  console.log(props);
  if (props.isFetching === false && props.Posts !== undefined) {
  console.log(props.Posts);
    return (
      <div>
        <p>tests</p>
        <p>{props.Posts[2].title}</p>
      </div>
    );
  } else {
    return <props.CircularProgress />;
  }
}
