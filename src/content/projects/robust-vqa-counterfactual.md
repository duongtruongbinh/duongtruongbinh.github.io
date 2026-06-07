---
title: "Counterfactual Reasoning for Robust Visual Question Answering"
description: "A counterfactual training framework designed to reduce language bias and improve visual grounding in visual question answering models."
tags:
  - "Visual Question Answering"
  - "Robust AI"
  - "Counterfactual Learning"
  - "Contrastive Learning"
external_url: "https://github.com/duongtruongbinh/robust-vqa-counterfactual"
---

## Overview

Visual question answering models often exploit language priors instead of grounding their predictions in image content.

This project develops a robust training framework that encourages models to distinguish between valid visual evidence and spurious correlations in the training data.

## Method

The framework combines:

1. **Answer-contrastive regularization** to improve discrimination between semantically related answer candidates.
2. **Gradient-discrepancy regularization** to reduce reliance on biased question-answer patterns.
3. **Curriculum training** to progressively introduce counterfactual and debiasing objectives.

## Results

The method achieved **61.64% accuracy on VQA-CP v2** and reduced the generalization gap relative to VQA v2 to **1.16 percentage points**.

## Resources

- [Source code](https://github.com/duongtruongbinh/robust-vqa-counterfactual)
