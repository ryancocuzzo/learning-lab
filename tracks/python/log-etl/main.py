
import orjson

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
        print(f'Could not access file {path}')
        raise err

def main():
    try:
        # 1. get input and output file paths
        input_file = input("Specify the input file: ")
        # output_file = input("Specify the output file: ")

        data = load_input_file_json(input_file)

        print(data)

    except KeyboardInterrupt:
        print("\nUser signaled to exit application.")
    finally:
        print("Exiting applicaiton.")

main()