import React from 'react';

export default function CurrentImage(props) {
  const dateString = props.match && props.match.params && props.match.params.date;
  return (<div>{dateString}</div>);
}
