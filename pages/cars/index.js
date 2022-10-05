const Cars = () => {
  const data = ['car1', 'car2'];
  return (
    <div>
      <ul>
        {data.map(car => (<li key={car} onClick={() => { console.log(car);}}>{car}</li>))}
      </ul>
    </div>
  );
}

export default Cars;