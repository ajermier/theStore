namespace theStore.Models
{
    public class CreateProductRequest
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int Quantity { get; set; }
    }
}
