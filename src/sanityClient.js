import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'ry0ba1mn',
  dataset: 'production',
  apiVersion: '2022-01-01',
  withCredentials: true,
  useCdn: false, // Set to true for public datasets
  token: 'sk8Qztyp5jHv0WTDTdlvlewGQTO3TkMbVPX0rUCH9zAufScoML8mR9SGyovOn8ir7Zt0bUgj5q8KfFCP9RlbvyU8o30jY3B1GH2lzO6Yd31s7EyiH8p30jGeIcZH4RPA9KQfXGBK7zPwxnkKxwlXwI6ioT84vnheaKsNXVBhKCFMCPuwOdBx'
});

export default sanityClient;
