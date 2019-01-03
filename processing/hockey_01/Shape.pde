public interface Shape {
  public float x();
  public float y();
  public float minX();
  public float minY();
  public float maxX();
  public float maxY();

  public boolean containsXY(float x, float y);

  public void draw();
}
