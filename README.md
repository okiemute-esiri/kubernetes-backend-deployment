# Kubernetes Backend Deployment

Production-oriented Kubernetes deployment example for a containerized backend service.

## Status

This repository contains a working Node.js/TypeScript service plus Kubernetes manifests demonstrating application deployment, service discovery, configuration, health probes, resource management, autoscaling and ingress.

## Architecture

```text
Client
  |
Ingress
  |
Service (ClusterIP)
  |
Deployment
  |-- backend pod
  |-- backend pod
  `-- backend pod
       |
       +-- ConfigMap
       `-- Secret reference

HorizontalPodAutoscaler -> Deployment
```

## Implemented

- TypeScript + Express backend
- `/health` liveness endpoint
- `/ready` readiness endpoint
- multi-stage Docker image
- Kubernetes Namespace
- ConfigMap-based runtime configuration
- Secret reference pattern (example only; no real secret committed)
- Deployment with rolling-update strategy
- liveness and readiness probes
- CPU/memory requests and limits
- ClusterIP Service
- HorizontalPodAutoscaler
- Ingress routing
- GitHub Actions validation workflow

## Repository Structure

```text
.
├── src/
│   ├── app.ts
│   └── server.ts
├── tests/
│   └── app.test.ts
├── k8s/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secret.example.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── hpa.yaml
│   └── ingress.yaml
├── .github/workflows/ci.yml
├── Dockerfile
├── package.json
└── tsconfig.json
```

## Local Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run typecheck
npm test
npm run build
kubectl apply --dry-run=client -f k8s/
```

## Container

```bash
docker build -t kubernetes-backend-deployment:local .
docker run --rm -p 3000:3000 kubernetes-backend-deployment:local
```

## Kubernetes

For a real cluster, replace the demonstration image name in `k8s/deployment.yaml` with an image published to your registry and create the runtime Secret outside source control.

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml
kubectl apply -f k8s/ingress.yaml
```

`secret.example.yaml` is documentation only. Production credentials should be supplied through an external secret-management mechanism or created securely in the target cluster.

## Production Evolution

Planned extensions include PodDisruptionBudget, NetworkPolicy, ServiceAccount/RBAC, external secret integration, TLS/cert-manager, Prometheus metrics, distributed tracing and GitOps deployment.

## Portfolio Focus

The repository demonstrates Kubernetes deployment engineering rather than claiming a live production cluster. It focuses on declarative configuration, workload health, controlled rollouts, autoscaling and operational safety.
