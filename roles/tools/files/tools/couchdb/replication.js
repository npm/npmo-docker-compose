/**
 * This tool sets up replication between CouchDB nodes.
 */
import path from 'path';
import CouchDB from './couchdb';

const replicationConfigPath = path.resolve(__dirname, '../..', process.argv[2]);
const replicationConfig = require(replicationConfigPath);

/**
 * Perform Promise operations in sequence. Takes an array of functions.
 */
const sequence = (fns) => {
  return fns.reduce(
    (pPrev, fn) => pPrev.then(fn),
    Promise.resolve()
  );
};

const setupReplication = ({target, upstream, continuous=false, databases=[]}) => {
  const db = new CouchDB(target);
  return sequence(
    databases.map((database) => () => {
      console.log(
        `${db.host}: replicating ${upstream}/${database} ${continuous ? '(continuous)' : ''}`
      );
      return db.replicateFrom(upstream, database, { continuous });
    })
  );
};

sequence(replicationConfig.map((item) => () => setupReplication(item)))
  .then(
    () => console.log('Done!'),
    (why) => console.error(why.stack)
  );
