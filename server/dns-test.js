import dns from 'dns';

dns.resolveSrv('_mongodb._tcp.cluster0.gqxdr7s.mongodb.net', (err, addresses) => {
  if (err) {
    console.error("DNS Resolve SRV Error:", err);
    process.exit(1);
  }
  console.log("Resolved SRV Addresses:", addresses);
  process.exit(0);
});
