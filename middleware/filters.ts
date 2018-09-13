export default [
  {
    filterName: "numberFilter",
    func: function(num: string) {
      return num.replace(/[^\d]/g, "");
    }
  }
];
