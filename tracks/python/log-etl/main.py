import orjson

from order_service import OrderService
from log import LogProcessor


def load_input_file_json(path: str) -> list[dict]:
    try:
        with open(path, "r") as f:
            # trade-off is right now we're storing all the items into memory
            log_lines = []
            for line in f:
                if line == "" or line == "\n":
                    continue
                data = orjson.loads(line)
                log_lines.append(data)
            return log_lines
    except FileNotFoundError as err:
        print(f"Could not find file {path}")
        raise err
    except PermissionError as err:
        print(f"Could not access file {path}")
        raise err


def main():
    try:
        # 1. get input and output file paths
        input_file = "data.log"  # input("Specify the input file: ")

        data = load_input_file_json(input_file)

        os = OrderService()
        lp = LogProcessor(os)
        for raw_log in data:
            lp.process_log(raw_log)

        print("=" * 30)
        print(f"Order summary")
        print("=" * 30)
        print("# of orders".rjust(20), ":", f"{os.num_orders()}".ljust(20))
        print("Total revenue".rjust(20), ":", f"{os.compute_total_revenue()}".ljust(20))
        print("\nTotal revenue per product:")
        for product, revenue in os.compute_revenue_per_product().items():
            print(f"{product}".rjust(20), ":", f"{revenue}".rjust(15))

        k = 3
        print(f"\nTop {k} products:")
        for product, revenue in os.compute_revenue_per_product(top_k=k).items():
            print(f"{product}".rjust(20), ":", f"{revenue}".rjust(15))

        print("=" * 30)

    except KeyboardInterrupt:
        print("\nUser signaled to exit application.")
    finally:
        print("Done.")


main()
