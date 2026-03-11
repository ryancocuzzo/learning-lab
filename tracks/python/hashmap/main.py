from typing import Any
from threading import Lock


class HashMap:

    m: dict[str, Any]
    lock: Lock

    def __init__(self):
        self.m = {}
        self.lock = Lock()

    def set(self, key: str, val: Any) -> None:
        with self.lock:
            self.m[key] = val

    def get(self, key: str) -> Any | None:
        with self.lock:
            return self.m.get(key)

    def clear(self) -> None:
        with self.lock:
            self.m = {}


m = HashMap()

m.set("a", 123)
print(m.get("a"))
