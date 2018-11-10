class RootApicalMeristem extends ApicalMeristem {
  meristemOfSameType(segment){
    return new RootApicalMeristem(segment);
  }
}
