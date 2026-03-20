import { Resolver } from 'dns';
const resolver = new Resolver();
resolver.setServers(['8.8.8.8']);

resolver.resolveSrv('_mongodb._tcp.cluster0.gqxdr7s.mongodb.net', (err, addresses) => {
  if (err) {
    console.error("DNS Resolve SRV Error (using 8.8.8.8):", err);
    process.exit(1);
  }
  console.log("Resolved SRV Addresses:", JSON.stringify(addresses));
  
  // Resolve TXT for options
  resolver.resolveTxt('cluster0.gqxdr7s.mongodb.net', (err, txt) => {
    if (err) {
        console.error("DNS Resolve TXT Error:", err);
    } else {
        console.log("Resolved TXT Options:", JSON.stringify(txt));
    }
    process.exit(0);
  });
});
