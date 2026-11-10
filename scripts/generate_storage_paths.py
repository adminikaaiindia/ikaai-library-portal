import re

with open('supabase/seed.sql', 'r', encoding='utf-8') as f:
    sql = f.read()

# 1. Programmes
progs = {
    '10000000-0000-0000-0000-000000000001': {'slug': 'human-resources', 'name': 'Human Resources', 'sort': 1},
    '10000000-0000-0000-0000-000000000002': {'slug': 'data-analyst', 'name': 'Data Analyst', 'sort': 2},
    '10000000-0000-0000-0000-000000000003': {'slug': 'social-research-policy', 'name': 'Social Research & Policy', 'sort': 3},
    '10000000-0000-0000-0000-000000000004': {'slug': 'design-social-media', 'name': 'Design & Social Media', 'sort': 4},
    '10000000-0000-0000-0000-000000000005': {'slug': 'business-development', 'name': 'Business Development', 'sort': 5}
}

# 2. Modules
modules = {}
# match modules
for b in sql.split('insert into public.modules')[1:]:
    vm = re.search(r"values\s*\(\s*'([^']+)',\s*'([^']+)',\s*(\d+),\s*'([^']+)'", b)
    if vm:
        mid, pid, num, title = vm.group(1), vm.group(2), int(vm.group(3)), vm.group(4)
        modules[mid] = {'id': mid, 'prog_id': pid, 'num': num, 'title': title}

print(f"Loaded {len(modules)} modules.")

# 3. Resources
resource_blocks = sql.split("insert into public.resources")[1:]

resources = []
for b in resource_blocks:
    val_m = re.search(r"values\s*\(\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*(.*?),\s*'([^']+)',\s*(NULL|'[^']*'),\s*(\d+)\s*\)", b, re.DOTALL)
    if val_m:
        rid = val_m.group(1)
        mid = val_m.group(2)
        res_num = val_m.group(3)
        raw_title = val_m.group(4).strip()
        if raw_title.startswith("'") and raw_title.endswith("'"):
            title = raw_title[1:-1].replace("''", "'")
        else:
            title = raw_title
        rtype = val_m.group(5).lower()
        sort_order = int(val_m.group(7))

        mod = modules.get(mid, {})
        prog = progs.get(mod.get('prog_id'), {})

        resources.append({
            'id': rid,
            'module_id': mid,
            'prog_id': mod.get('prog_id'),
            'prog_slug': prog.get('slug'),
            'prog_name': prog.get('name'),
            'prog_sort': prog.get('sort', 0),
            'mod_num': mod.get('num', 0),
            'mod_title': mod.get('title', ''),
            'res_num': res_num,
            'title': title,
            'type': rtype,
            'sort_order': sort_order
        })

print(f"Loaded {len(resources)} resources.")

# Sort by portal order: programme sort, module num, sort_order
def sort_key(r):
    try:
        parts = r['res_num'].split('.')
        n1 = int(parts[0])
        n2 = int(parts[1]) if len(parts) > 1 else 0
    except:
        n1, n2 = 0, 0
    return (r['prog_sort'], r['mod_num'], r['sort_order'], n1, n2)

resources.sort(key=sort_key)

for i, r in enumerate(resources):
    print(f"{i+1:2d}. {r['prog_slug']} | Mod {r['mod_num']} | Res {r['res_num']} ({r['type']}): {r['title']}")
