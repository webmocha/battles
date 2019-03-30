/*
  Utility component for Link as...

  Usage:

  the url will display '/fight/123/abc'
    will render the page 'pages/fight/show.js'
    as real url -> '/fight/show?id=123&name=abc'

    <LinkAs
      route='./fight/show/:id/:name'
      urlDisplay='/fight/:id/:name'
      id={id}
      name={name}>
      <a>{name}</a>
    </LinkAs>


  the urlDisplay is optional
  this url will display '/fight/show/123/abc'
    will render the page 'pages/fight/show.js'
    as real url -> '/fight/show?id=123&name=abc'

    <LinkAs
      route='./fight/show/:id/:name'
      id={id}
      name={name}>
      <a>{name}</a>
    </LinkAs>

 */

import Link from "next/link";
import qs from "querystring";

const makeAs = (props) =>
  (props.urlDisplay ? props.urlDisplay : props.route)
    .split("/")
    .map((part) => (part.startsWith(":") ? props[part.substr(1)] : part))
    .join("/");

const makeHref = (props) =>
  props.route
    .split("/")
    .reduce(
      ([path, params], part) =>
        part.startsWith(":")
          ? [path, { ...params, [part.substr(1)]: props[part.substr(1)] }]
          : [path + "/" + part, params],
      ["", {}],
    )
    .reduce(
      (path, tuple, i) => (i === 0 ? tuple : path + "?" + qs.stringify(tuple)),
      "",
    );

export default (props) => (
  <Link as={makeAs(props)} href={makeHref(props)}>
    {props.children}
  </Link>
);
