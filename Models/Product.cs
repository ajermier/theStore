using System;

namespace theStore.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime DateAdded { get; set; }

        public int Quantity { get; set; }
    }
}
