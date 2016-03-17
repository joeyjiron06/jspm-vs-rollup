import Ferrari from './models/ferrari';

// This is the library class that will be exposed to clients
class CarFactory {
  createAFerrrari() {
    return new Ferrari();
  }
}

export default CarFactory;