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

```

```
