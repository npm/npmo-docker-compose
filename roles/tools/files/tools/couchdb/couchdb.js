import fetch from 'node-fetch';

export default class CouchDB {
  static defaultHeaders = {
    'Content-Type': 'application/json'
  };

  /**
   * host: string host, eg 'your-database:5984'
   */
  constructor(host) {
    this.host = host;
  }

  /**
   * Set up replication between this CouchDB instance and an upstream.
   *
   * upstream: string host of the upstream couch, eg 'another-database:5984'
   * database: string database to replicate, eg 'data'
   * opts: options object
   *    continuous: boolean should the replication be continuous. Note: continuous replication is
   *                'forgotten' when the databse machiner restarts.
   *
   * Returns a Promise for the result.
   */
  replicateFrom(upstream, database, opts={}) {
    const { continuous = false } = opts;

    // source: the upstream hostname and the target database
    // target: the local database name
    // continuous: should we follow the changes?
    const body = {
      source: `http://${upstream}/${database}`,
      target: `${database}`,
      continuous
    };

    return fetch(`http://${this.host}/_replicate`, {
      method: 'POST',
      headers: CouchDB.defaultHeaders,
      body: JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((body) => {
      // TODO detect missing DB and create it?
      if (body.error) {
        throw new Error(`Failed to setup replication: ${body.error} — ${body.reason}`);
      }
      return body;
    });
  }
};
