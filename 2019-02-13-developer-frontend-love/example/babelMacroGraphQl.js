import {gql} from "graphql.macro";

const query = gql`
    {
        Movie(title: "River Runs Through It, A") { year }
    }
`;
// becomes...
const query = {
  "kind": "Document",
  "definitions": [{
    ...
