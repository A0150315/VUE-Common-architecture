const dev: boolean = false;
const ip: string = dev ? "http://localhost" : "";

export default [
  {
    path: ip + "/test",
    methods: "POST",
    name: "test"
  }
];
