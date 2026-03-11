package main

import (
	"fmt"

	"sync"
)

type HashMap struct {
	m  map[string]any
	mu sync.Mutex
}

func NewHashMap() *HashMap {
	return &HashMap{m: map[string]any{}, mu: sync.Mutex{}}
}

func (m *HashMap) Set(key string, val any) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.m[key] = val
}

func (m *HashMap) Get(key string) any {
	m.mu.Lock()
	defer m.mu.Unlock()
	return m.m[key]
}

func (m *HashMap) Clear() {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.m = map[string]any{}
}

func main() {
	m := NewHashMap()
	m.Set("a", 123)
	fmt.Printf("m[a]=%v", m.Get("a"))
}
