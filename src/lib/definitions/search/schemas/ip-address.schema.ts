import { z } from 'zod';

/* 
  IP addresses
  https://zod.dev/?id=ip-addresses
  --------------------------------------------------------------------------
  The z.string().ip() method by default validate IPv4 and IPv6.

  const ip = z.string().ip();

  ip.parse("192.168.1.1"); // pass
  ip.parse("84d5:51a0:9114:1855:4cfa:f2d7:1f12:7003"); // pass
  ip.parse("84d5:51a0:9114:1855:4cfa:f2d7:1f12:192.168.1.1"); // pass

  ip.parse("256.1.1.1"); // fail
  ip.parse("84d5:51a0:9114:gggg:4cfa:f2d7:1f12:7003"); // fail

  You can additionally set the IP version.

  const ipv4 = z.string().ip({ version: "v4" });
  ipv4.parse("84d5:51a0:9114:1855:4cfa:f2d7:1f12:7003"); // fail

  const ipv6 = z.string().ip({ version: "v6" });
  ipv6.parse("192.168.1.1"); // fail 
 */

export const ipAddressSchema = z.string().ip();
