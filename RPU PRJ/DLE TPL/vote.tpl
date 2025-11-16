<div class="bg-card border border-border rounded-lg p-6 space-y-4">
	<div class="space-y-2">
		<h3 class="font-semibold text-lg text-foreground">
			{title}
		</h3>
	</div>
	<div class="space-y-3">
		[votelist]
		<form method="post" name="vote" class="space-y-4">
		[/votelist]
		
		<div class="space-y-2">
			{list}
		</div>
		
		[voteresult]
		<div class="text-sm text-muted-foreground border-t border-border pt-3 mt-3">
			Всего проголосовало: <span class="font-semibold text-foreground">{votes}</span>
		</div>
		[/voteresult]
		
		[votelist]
		<input type="hidden" name="vote_action" value="vote" />
		<input type="hidden" name="vote_id" id="vote_id" value="{vote_id}" />
		<div class="flex gap-2 pt-2">
			<button class="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity" type="submit" onclick="doVote('vote'); return false;">
				Голосовать
			</button>
			<button class="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity" type="button" onclick="doVote('results'); return false;">
				<span class="fa fa-align-left"></span>
			</button>
			<button class="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity" type="submit" onclick="ShowAllVotes(); return false;">
				<span class="fa fa-plus"></span>
			</button>
		</div>
		</form>
		[/votelist]
	</div>
</div>
