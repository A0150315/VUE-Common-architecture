export default {
  changePeople: (state: any) => {
    return state.people.filter((item: any) => {
      if (item.age > 30) {
        return true;
      }
    });
  }
};
