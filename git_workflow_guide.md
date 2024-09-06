# Git 工作流程和常用命令

## 基本概念

- **本地仓库**：您电脑上的项目副本
- **远程仓库**：托管在服务器（如 GitHub）上的项目副本
- **分支**：代码的独立开发线

## 常用命令

### 仓库操作

```bash
克隆远程仓库
git clone <仓库 URL>
添加远程仓库
git remote add <远程名> <仓库 URL>
查看远程仓库
git remote -v
从远程仓库获取更新（不合并）
git fetch <远程名>
从远程仓库拉取更新并合并
git pull <远程名> <分支名>
```

### 分支操作

```bash
查看所有分支
git branch -a
创建新分支
git checkout -b <新分支名>
切换分支
git checkout <分支名>
合并分支
git merge <要合并的分支名>
删除本地分支
git branch -d <分支名>
删除远程分支
git push <远程名> --delete <分支名>
清理已经不存在的远程分支引用
git remote prune <远程名>
```

### 更改和提交

```bash
查看更改状态
git status
添加更改到暂存区
git add .
提交更改
git commit -m "提交描述"
推送更改到远程仓库
git push <远程名> <分支名>
```

## 典型工作流程

1. **创建功能分支**：

   ```bash
   git checkout -b feature-branch
   ```

2. **进行开发工作并提交更改**：

   ```bash
   git add .
   git commit -m "实现新功能"
   ```

3. **推送分支到远程仓库**：

   ```bash
   git push origin feature-branch
   ```

4. **合并到主分支**：

   ```bash
   git checkout main
   git merge feature-branch
   ```

5. **推送主分支更新**：

   ```bash
   git push origin main
   ```

6. **删除功能分支**（可选）：
   ```bash
   git branch -d feature-branch
   git push origin --delete feature-branch
   ```

## 处理多个远程仓库

- 可以为一个项目添加多个远程仓库
- 每个远程仓库可以有多个分支
- 推送时需指定远程仓库和分支：
  ```bash
  git push <远程名> <分支名>
  ```

## 注意事项

- 经常拉取（pull）远程更新以保持同步
- 在合并前先测试功能分支
- 使用有意义的提交信息
- 定期检查 `package.json` 确保依赖正确

## 处理无关历史

当合并两个没有共同祖先的分支时，可能会遇到"拒绝合并无关的历史"错误。使用以下命令允许合并无关历史

```bash
git merge <分支名> --allow-unrelated-histories
```

注意：使用此选项时要谨慎，确保您理解合并的影响。

## 删除远程仓库引用

当远程仓库被删除后，需要手动从本地配置中删除对应的引用

```bash
删除特定的远程仓库引用
git remote remove <远程名>
清理不存在的远程分支引用
git remote prune <远程名>
```

## 创建新的私有仓库分支

从现有项目创建新的私有仓库分支：

1. 在 GitHub 上创建新的私有仓库
2. 添加新的远程仓库：
   ```bash
   git remote add private <新仓库URL>
   ```
3. 基于 main 分支创建新的私有分支：
   ```bash
   git checkout main
   git checkout -b private-branch
   ```
4. 推送新分支到私有仓库：
   ```bash
   git push -u private private-branch
   ```
5. 验证设置：
   ```bash
   git remote -v
   git branch -a
   ```
